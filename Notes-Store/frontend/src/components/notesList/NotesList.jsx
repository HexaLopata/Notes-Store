import { useState } from 'react'
import { connect } from 'react-redux'
import DateTimeService from '../../services/DateTimeService'
import Note from '../note/Note'
import Selection from '../selection/Selection'

export const NotesList = ({ notes }) => {

    const [sortType, setSortType] = useState('По дате')

    let sortFunction
    switch (sortType) {
        case 'По дате':
            sortFunction = (a, b) => {
                return DateTimeService.parseDate(b.date).getTime() - DateTimeService.parseDate(a.date).getTime()
            }
            break
        case 'По приоритету':
            sortFunction = (a, b) => {
                return b.priority - a.priority
            }
            break
    }

    const sortedNotes = notes.sort(sortFunction)

    return (
        <>
            <h1 className='mt-4 text-center'>Ваши заметки</h1>
            {
                notes.length > 0 ?
                    <>
                        <Selection
                            header='Сортировка'
                            options={['По дате', 'По приоритету']}
                            value={sortType}
                            setValue={setSortType}
                            className='mt-4 text-center'
                        />
                        <div className='d-flex flex-wrap justify-content-center mt-4'>
                            {sortedNotes.map((note) => {
                                return (
                                    <div className='p-1' key={note.id}>
                                        <Note width={'250px'} height={'250px'} note={note} />
                                    </div>
                                )
                            })}
                        </div>
                    </>
                    :
                    <p className='mt-2 text-center'>Вы еще не добавили заметок</p>
            }
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    const notes = state.notes.notes
    return { notes, ...ownProps }
}

export default connect(mapStateToProps)(NotesList)