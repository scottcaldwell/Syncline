class CreateFieldTests < ActiveRecord::Migration
  def change
    create_table :field_tests do |t|
      t.float :depth_from
      t.float :depth_to
      t.string :type
      t.belongs_to :layer, index: true

      t.timestamps
    end
  end
end
