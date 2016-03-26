class LayersController < ApplicationController

  def index
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

  def update
    @layer = Layer.find(params[:id])
    @layer.update_attributes(
      drill_hole_id: params[:drill_hole_id],
      thickness: params[:thickness],
      description: params[:description],
      material_type_id: params[:material_type_id]
    )
    material = MaterialType.find(params[:material_type_id])

    respond_to do |format|
      format.json { render json: { data: @layer, material: material.name } }
    end
  end

  def site_layers
    @depth_drilled_by_date = Layer.depth_drilled_by_date(params[:id])
    @drill_holes = DrillHole.where(site_id: params[:id])
    @drill_holes_gravel_data = []
    @drill_holes_sand_data = []
    @drill_holes_silt_data = []
    @drill_holes_clay_data = []
    @total_gravel_thickness = 0
    @total_sand_thickness = 0
    @total_silt_thickness = 0
    @total_clay_thickness = 0
    @drill_holes.each do |drill_hole|
      @gravel_thickness = Layer.layer_thickness(drill_hole.id, 'Gravel')
      @sand_thickness = Layer.layer_thickness(drill_hole.id, 'Sand')
      @silt_thickness = Layer.layer_thickness(drill_hole.id, 'Silt')
      @clay_thickness = Layer.layer_thickness(drill_hole.id, 'Clay')
      @drill_holes_gravel_data.push([drill_hole.name, @gravel_thickness])
      @drill_holes_sand_data.push([drill_hole.name, @sand_thickness])
      @drill_holes_silt_data.push([drill_hole.name, @silt_thickness])
      @drill_holes_clay_data.push([drill_hole.name, @clay_thickness])
      @total_gravel_thickness += @gravel_thickness
      @total_sand_thickness += @sand_thickness
      @total_silt_thickness += @silt_thickness
      @total_clay_thickness += @clay_thickness
    end
    
    respond_to do |format|
      format.html # new.html.erb
      format.json { 
        render json: { 
          depth_drilled_by_date: @depth_drilled_by_date,
          total_gravel_thickness: @total_gravel_thickness, 
          total_sand_thickness: @total_sand_thickness, 
          total_silt_thickness: @total_silt_thickness, 
          total_clay_thickness: @total_clay_thickness,
          drill_holes_gravel_data: @drill_holes_gravel_data,
          drill_holes_sand_data: @drill_holes_sand_data,
          drill_holes_silt_data: @drill_holes_silt_data,
          drill_holes_clay_data: @drill_holes_clay_data
        }
      }
    end
  end

  def sort
    data = JSON.parse(params[:order])
    data.each do |value|
      puts(value['id'])
      Layer.find(value['id'].to_i).update_attribute(:layer_order, value['position'].to_i)
    end

    render json: { data: 'it worked?' }
  end

  protected

  def layer_params
    params.require(:layer).permit(:thickness, :description, :material_type_id, :drill_hole_id)
  end
end
