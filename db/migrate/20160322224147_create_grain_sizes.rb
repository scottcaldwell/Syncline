class CreateGrainSizes < ActiveRecord::Migration
  def change
    create_table :grain_sizes do |t|
      t.integer :fines_content
      t.belongs_to :lab_test, index: true

      t.timestamps
    end
  end
end
