require_relative '../../spec_helper'

RSpec.describe UserRepository do
  let(:rep) { UserRepository.new } 
  let(:params) do
    {
      uid: '123456',
      info: {
        name: 'Test',
        email: 'example@example.ru'
      }
    }
  end

  describe '#auth!' do
    before do
      rep.auth!(params)
    end

    context 'when user no exists' do
      it 'has proper name' do
        expect(rep.last.name).to eql('Test')
      end

      it 'has proper email' do
        expect(rep.last.email).to eql('example@example.ru')
      end
    end
  end
end
