require './apps/web_api/controllers/sessions/new'

RSpec.describe WebApi::Controllers::Sessions::New do
  let(:action) { described_class.new }
  let(:params) { { 'onmiauth.auth' => omniauth_params } }

  it 'is successful' do
    response = action.call(params)

    expect(response[0]).to eq(302)
  end
end