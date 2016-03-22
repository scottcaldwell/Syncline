class CreateSpts < ActiveRecord::Migration
  def change
    create_table :spts do |t|
      t.integer :blow_count
      t.belongs_to :field_test, index: true

      t.timestamps
    end
  end
end
