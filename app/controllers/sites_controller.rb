class SitesController < ApplicationController
  include ApplicationHelper
  before_action :require_logged_in_user
  
  respond_to :html, :js

  def index
    @sites = Site.all
    @site = Site.new
  end

  def show
    @site_id = params[:id]
    @site = Site.find(@site_id)
    @drill_holes = DrillHole.where(site_id: @site_id)
    @drill_hole = DrillHole.new
  end

  def create
    @site  = Site.create(site_params)
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

  def require_logged_in_user
    unless current_user
      flash[:error] = "You must be logged in to see your sites"
      redirect_to root_path
    end
  end

  def site_params
    # params.require(:site).permit()
    params.require(:site).permit(:site_name, :center_lat, :center_lng)
  end

end
