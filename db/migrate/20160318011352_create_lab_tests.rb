class CreateLabTests < ActiveRecord::Migration
  def change
    create_table :lab_tests do |t|
      t.string :test_type
      t.float :depth_from
      t.float :depth_to
      t.belongs_to :field_test, index: true

      t.timestamps
    end
  end
end
