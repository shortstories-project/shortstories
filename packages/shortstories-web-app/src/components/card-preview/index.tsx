import * as React from 'react'
import styled from 'styled-components'

const Card = styled.div`
    width: 32%;
    min-height: 450px;
    border: 1px solid #e9e9e9;
    margin: 30px 0 0 0;
    background-color: #e9e9e9;
    padding: 20px;
    @media screen and (max-width: 800px) {
    width: 100%;
    }
`

const HeadCard = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 0 25px 0px;
    font-size: 13px;
`



class Index extends React.PureComponent {

    //TODO заглушка для бэкэнда
    dataUser = {
        name: 'Anton',
        lastName: 'Panachyow',
        story:  'Интересный пример, что с дискриминацией лучше\n' +
                'бороться вместе, а не отдельно для женщин и\n' +
                'мужчин. Есть проблема, что компании не берут\n' +
                'женщин, так как боятся, что те уйдут в декрет.\n' +
                'Но если всегда давать декрет и мужчинам, то\n' +
                'риск ухода в декрет не будет зависит от пола.\n' +
                'Очевидно, чем дальше, тем сложнее России будет\n' +
                'удерживаться на двух стульях — одновременно\n' +
                'Если вы думаете, что сниматься в порно - это\n' +
                'всегда приятное и интересное занятие, то\n' +
                'вынужден вас огорчить. В пятом выпуске подкаста\n' +
                '«Порнкаст Шоу» вы узнаете какие травмы получают\n' +
                'актеры и актрисы на съемках в порно.',
        dateArticleCreation: '24.08.2018'
    }

    render() {
        return (
            <>
                <Card>
                    <HeadCard>
                        <span>{this.dataUser.lastName + ' ' + this.dataUser.name}</span>
                        <span>{this.dataUser.dateArticleCreation}</span>
                    </HeadCard>
                    <article>
                        {this.dataUser.story}
                    </article>
                </Card>
            </>
        )
    }
}

export default Index