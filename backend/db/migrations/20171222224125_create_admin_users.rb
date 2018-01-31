Hanami::Model.migration do
  change do
    create_table :admin_users do
      primary_key :id

      column :email, String, null: false
      column :password, String, null: false

      column :created_at, DateTime, null: false
      column :updated_at, DateTime, null: false
    end
  end
end
