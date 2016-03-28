class FieldTestsController < ApplicationController
  include ApplicationHelper

  def create
    @field_test = FieldTest.new(field_test_params)
    if field_test.save
      respond_to do |format|
        format.json { render json: { data: @field_test } }
      end
      session[:field_test_id] = @field_test.id
    end
  end

  def new
  end

  def update
    @field_test = FieldTest.find(params[:id])
    session[:field_test_id] = @field_test.id
    @field_test.update_attributes(
      test_type: "SPT",
      depth_from: params[:depth_from],
      depth_to: params[:depth_to],
      layer_id: current_layer
    )

    respond_to do |format|
      format.json { render json: { data: @field_test } }
    end
  end

  def destroy
  end

  protected

  def field_test_params
    params.require(:field_test).permit(:depth_from, :depth_to, :test_type)
  end


end
