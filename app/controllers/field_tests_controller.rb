class FieldTestsController < ApplicationController

  def create
    @field_test = FieldTest.create()
  end

  def new
  end

  def update
  end

  def destroy
  end

  protected

  def field_test_params
    params.require(:field_test).permit(:depth_from, :depth_to, :test_type, :layer_id)
  end


end
