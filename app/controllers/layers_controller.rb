class LayersController < ApplicationController

  def index
    @gravel_thickness = Layer.where(drill_hole_id: params[:drill_hole_id], material_type_id: MaterialType.where(name: 'Gravel').pluck(:id)).sum(:thickness)
    @sand_thickness = Layer.where(drill_hole_id: params[:drill_hole_id], material_type_id: MaterialType.where(name: 'Sand').pluck(:id)).sum(:thickness)
    @silt_thickness = Layer.where(drill_hole_id: params[:drill_hole_id], material_type_id: MaterialType.where(name: 'Silt').pluck(:id)).sum(:thickness)
    @clay_thickness = Layer.where(drill_hole_id: params[:drill_hole_id], material_type_id: MaterialType.where(name: 'Clay').pluck(:id)).sum(:thickness)
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: { gravel_thickness: @gravel_thickness, sand_thickness: @sand_thickness, silt_thickness: @silt_thickness, clay_thickness: @clay_thickness } }
    end
  end
end
