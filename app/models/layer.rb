class Layer < ActiveRecord::Base
  belongs_to :material_type
  belongs_to :drill_hole
  has_many :field_tests
  has_many :lab_tests

  def round_thickness
    thickness.round(2)
  end  
end
