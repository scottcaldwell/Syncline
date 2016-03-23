class SitesController < ApplicationController

  def index
    @sites = Site.all
  end

  def show
    @site = Site.find(params[:id])
    @drill_holes = DrillHole.where(site_id: @site.id)
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @site }
    end
  end

  protected

  def site_params
    # params.require(:site).permit()
  end

end
