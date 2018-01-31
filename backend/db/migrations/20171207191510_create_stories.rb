Hanami::Model.migration do
  change do
    create_table :stories do
      primary_key :id

      column :text, String, null: false, text: true

      column :created_at, DateTime, null: false
      column :updated_at, DateTime, null: false
    end
  end
end
