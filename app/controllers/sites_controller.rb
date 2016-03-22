class SitesController < ApplicationController

  def index
    @sites = Site.all
  end

  def show
    @site = Site.find(params[:id])
    @drill_holes = DrillHole.where(site_id: @site.id)
  end

  protected

  def site_params
    # params.require(:site).permit()
  end

end
