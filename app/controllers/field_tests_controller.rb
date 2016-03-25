class FieldTestsController < ApplicationController

  def create
    @field_test = FieldTest.new(field_test_params)
    if field_test.save
      respond_to do |format|
        format.json { render json: { data: @field_test } }
      end
    end
  end

  def new
  end

  def update
  end

  def destroy
  end

  protected

  def field_test_params
    params.require(:field_test).permit(:depth_from, :depth_to, :test_type)
  end


end
