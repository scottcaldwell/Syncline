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
  end

  def create
    @site  = Site.create(site_params)
    redirect_to :back
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
