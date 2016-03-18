class Photo < ActiveRecord::Base
  belongs_to :field_test
  belongs_to :lab_test
end
