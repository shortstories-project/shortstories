require_relative '../../spec_helper'

RSpec.describe UserRepository do
  before do
    # UserRepository.clear
  end

  let(:user) { described_class.new.auth!(params) }
  let(:params) do
    {
      info: {
        uid: '123456',
        name: 'Test',
        email: 'example@example.ru'
      }
    }
  end

  describe '#auth!' do
    context 'when user no exists' do
      before do
        described_class.new.auth!(params)
      end

      it 'has proper name' do
        expect(user.name).to eql('Test')
      end

      it 'has proper email' do
        expect(user.email).to eql('example@example.ru')
      end

      it 'create user' do
        expect { user }.to change { described_class.new.all.count }.by(1)
      end
    end
  end

end
