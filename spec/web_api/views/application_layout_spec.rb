require "spec_helper"

describe WebApi::Views::ApplicationLayout do
  let(:layout)   { WebApi::Views::ApplicationLayout.new(template, {}) }
  let(:rendered) { layout.render }
  let(:template) { Hanami::View::Template.new('apps/web_api/templates/application.html.erb') }

  it 'contains application name' do
    rendered.must_include('WebApi')
  end
end
