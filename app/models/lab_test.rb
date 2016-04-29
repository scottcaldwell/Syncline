class LabTest < ActiveRecord::Base
  belongs_to :field_test
  has_many :grain_sizes, dependent: :destroy
  has_many :photos, dependent: :destroy
end
