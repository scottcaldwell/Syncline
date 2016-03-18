class CreateDrillHoles < ActiveRecord::Migration
  def change
    create_table :drill_holes do |t|
      t.string :name
      t.float :ground_elev
      t.float :depth
      t.string :logged_by
      t.string :reviewed_by
      t.float :water_level_start
      t.float :water_level_during
      t.float :water_level_end
      t.belongs_to :site, index: true
      t.float :dh_lat
      t.float :dh_lng
      t.float :hole_size
      t.string :method

      t.timestamps
    end
  end
end
