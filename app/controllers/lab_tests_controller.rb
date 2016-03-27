class LabTestsController < ApplicationController
  include ApplicationHelper

  def new
  end

  def create
    @lab_test = LabTest.new(lab_test_params)
    if lab_test.save
      respond_to do |format|
        format.json { render json: { data: @lab_test } }
      end
      session[:lab_test_id] = @lab_test.id
    end
  end

  def update
    @lab_test = LabTest.find(params[:id])
    session[:lab_test_id] = @lab_test.id
    @lab_test.update_attributes(
      test_type: "Grain Size",
      depth_from: params[:depth_from],
      depth_to: params[:depth_to],
      field_test_id: params[:field_test_id]
    )

    respond_to do |format|
      format.json { render json: { data: @lab_test } }
    end
  end

  def destroy
  end

  protected

  def lab_test_params
    params.require(:lab_test).permit(:test_type, :depth_from, :depth_to)
  end

end
