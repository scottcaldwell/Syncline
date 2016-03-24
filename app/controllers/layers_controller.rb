class LayersController < ApplicationController

  def index
    @gravel_thickness = Layer.layer_thickness(params[:drill_hole_id], 'Gravel')
    @sand_thickness = Layer.layer_thickness(params[:drill_hole_id], 'Sand')
    @silt_thickness = Layer.layer_thickness(params[:drill_hole_id], 'Silt')
    @clay_thickness = Layer.layer_thickness(params[:drill_hole_id], 'Clay')
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: { gravel_thickness: @gravel_thickness, sand_thickness: @sand_thickness, silt_thickness: @silt_thickness, clay_thickness: @clay_thickness } }
    end
  end

  def site_layers
    @depth_drilled_by_date = Layer.depth_drilled_by_date(params[:id])
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @depth_drilled_by_date }
    end
  end
end
