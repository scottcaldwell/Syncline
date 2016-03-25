class LabTestsController < ApplicationController
  def new
  end

  def create
    @lab_test = LabTest.new(lab_test_params)
    if lab_test.save
      respond_to do |format|
        format.json { render json: { data: @lab_test } }
      end
    end
  end

  def update
  end

  def destroy
  end

  protected

  def lab_test_params
    params.require(:lab_test).permit(:test_type, :depth_from, :depth_to)
  end

end
