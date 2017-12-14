require "spec_helper"

describe Admin::Views::ApplicationLayout do
  let(:layout)   { Admin::Views::ApplicationLayout.new(template, {}) }
  let(:rendered) { layout.render }
  let(:template) { Hanami::View::Template.new('apps/admin/templates/application.html.erb') }

  it 'contains application name' do
    rendered.must_include('Admin')
  end
end
