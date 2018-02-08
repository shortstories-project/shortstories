Hanami::Model.migration do
  change do
    alter_table :stories do
      add_foreign_key :user_id, :users
    end
  end
end
