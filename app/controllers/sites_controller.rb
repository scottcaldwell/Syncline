class SitesController < ApplicationController

  def index
    @sites = Site.all
  end

  def show
    @site = Site.find(params[:id])
    puts @site.id
    @drill_holes = DrillHole.where(site_id: @site.id)
    p @drill_holes
  end

  protected

  def site_params
    # params.require(:site).permit()
  end

end
