class ProjectsController < ApplicationController

  def index
    @projectDetails = Project.where(site_id: params[:site_id])
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @projectDetails }
    end
  end

end
