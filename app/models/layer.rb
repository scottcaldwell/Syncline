class Layer < ActiveRecord::Base
  belongs_to :material_type
  belongs_to :drill_hole
  has_many :field_tests
  has_many :lab_tests

  default_scope { order('date_drilled') }

  scope :layer_thickness, -> (drill_hole_id, material_type_name) do
    where(drill_hole_id: drill_hole_id, material_type_id: MaterialType.where(name: material_type_name).pluck(:id)).sum(:thickness)
  end

  scope :depth_drilled_by_date, -> (site_id) do
    where(:drill_hole_id => DrillHole.where(site_id: site_id).select("id")).select("date_drilled, sum(thickness) as total_thickness").group(:date_drilled)
  end

  def round_thickness
    thickness.round(2)
  end
end
