class ChangeColumnName < ActiveRecord::Migration
  def change
    rename_column :field_tests, :kind, :test_type
  end
end
