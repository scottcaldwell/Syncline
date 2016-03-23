class SitesController < ApplicationController

  def index
    @sites = Site.all
  end

  def show
    @site_id = params[:id]
    @site = Site.find(@site_id)
    @drill_holes = DrillHole.where(site_id: @site_id)
  end

  protected

  def site_params
    # params.require(:site).permit()
  end

end
