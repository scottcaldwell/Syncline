class CreateLayers < ActiveRecord::Migration
  def change
    create_table :layers do |t|
      t.float :depth_from
      t.float :depth_to
      t.belongs_to :material, index: true
      t.belongs_to :drill_hole, index: true
      t.text :description

      t.timestamps
    end
  end
end
