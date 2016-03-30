class SitesController < ApplicationController
  include ApplicationHelper

  before_action :require_logged_in_user

  respond_to :html, :js

  def index
    @users_sites = SiteUser.where(user_id: current_user.id).pluck(:site_id)
    @sites = Site.where(id: @users_sites).order(created_at: :desc)
    @site = Site.new
  end

  def show
    @site_id = params[:id]
    @site = Site.find(@site_id)
    @drill_holes = DrillHole.where(site_id: @site_id)
    @drill_hole = DrillHole.new
    @user_credentials = current_user.first_name[0] + current_user.last_name[0]
    if @drill_holes.length > 0
      @latest_dh_name = @drill_holes.last.name
      @new_dh_name = (@latest_dh_name.scan(/(\D+)/).flatten + (@latest_dh_name.scan(/(\d+$)/).flatten.map{ |ele| ele.to_i + 1})).join("")
    else
      @new_dh_name = ''
    end
    session[:site_id] = @site_id
    is_a_site_user
  end

  def create
    @site  = Site.new(site_params)
    if @site.save
      @site_user = SiteUser.create(site_id: @site.id, user_id: current_user.id, admin: true)
    else
      flash[:error] = "Site not saved, verify your data."
    end
    redirect_to :back
  end

  def details
    @siteDetails = Site.where(id: params[:id]).select("drill_by_date, drill_to_depth")
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @siteDetails }
    end
  end

  protected

  def site_params
    # params.require(:site).permit()
    params.require(:site).permit(:site_name, :center_lat, :center_lng, :drill_to_depth, :drill_by_date)
  end

end
