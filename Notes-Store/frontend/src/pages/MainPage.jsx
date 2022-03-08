import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { connect } from "react-redux"
import NotesService from "../services/NotesService"

const MainPage = ({ isAuthenticated }) => {

    useEffect(() => {
        if (isAuthenticated) {
            NotesService.fetchNotesCount().then((response) => {
                setNotesCount(+response.data['count'])
            })
        }
    }, [isAuthenticated])

    const [notesCount, setNotesCount] = useState(-1)

    return (
        <div>
            <h1 className='text-center'>Notes Store</h1>
            <div className='text-center'>
                Сайт для хранения приватных заметок
            </div>
            {isAuthenticated ?
                <p className='text-center'>Текущее количество заметок:&nbsp;
                    {notesCount == -1 ?
                        <Spinner
                            animation="border"
                            variant='danger'
                            size='sm'
                        />
                        :
                        notesCount
                    }
                </p>
                :
                <></>
            }
            <p className='text-center'>
                Автор: студент КУБГТУ группы 21-КБ-ПР1 Гасюк Алексей
            </p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(MainPage)