class SitesController < ApplicationController
  respond_to :html, :js

  def index
    @sites = Site.all
    @site = Site.new
  end

  def show
    @site = Site.find(params[:id])
    @drill_holes = DrillHole.where(site_id: @site.id)
  end

  def create
    @site  = Site.create(site_params)
  end

  protected

  def site_params
    # params.require(:site).permit()
    params.require(:site).permit(:site_name, :center_lat, :center_lng)
  end

end
