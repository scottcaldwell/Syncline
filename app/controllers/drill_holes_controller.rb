class DrillHolesController < ApplicationController

  def index

  end

  def show
    @drill_hole = DrillHole.find(params[:id]);
    @layers = @drill_hole.layers
  end

  def new

  end

  def edit

  end

  def create

  end

  def update

  end

  protected

  def drill_hole_params

  end

end
