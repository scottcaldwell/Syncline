class DrillHolesController < ApplicationController

  def index

  end

  def show
    @drill_hole = DrillHole.find(params[:id]);
    @layers = @drill_hole.layers
    @layer = Layer.new
  end

  def new

  end

  def edit

  end

  def create

  end

  def update
    @drill_hole = DrillHole.find(params[:id])
    @drill_hole.update_attributes(drill_hole_params)

    respond_to do |format|
      format.json { render json: { save: true } }
    end
  end

  protected

  def drill_hole_params
    params.require(:drill_hole).permit(:name, :ground_elev, :depth, :logged_by, :reviewed_by, :water_level_start, :water_level_during, :water_level_end, :site_id, :dh_lat, :dh_lng, :hole_size, :method)
  end

end
