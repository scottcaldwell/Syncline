class LayersController < ApplicationController

  def index
    p params[:drill_hole_id]
    @layers = Layer.where(drill_hole_id: params[:drill_hole_id])
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @layers }
    end
  end
end
