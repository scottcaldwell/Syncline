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

  def create
    @layer = Layer.new(
      drill_hole_id: params[:drill_hole_id],
      thickness: params[:thickness],
      description: params[:description],
      material_type_id: params[:material_type_id]
    )

    if @layer.save
      respond_to do |format|
        format.json { render json: { data: @layer } }
      end
    end
  end

  def site_layers
    @depth_drilled_by_date = Layer.depth_drilled_by_date(params[:id])
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @depth_drilled_by_date }
    end
  end

  protected

  def layer_params
    params.require(:layer).permit(:thickness, :description, :material_type_id)
  end
end
