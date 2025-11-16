import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/axios'

const initialState = {
    messages: []
}

export const fetchMessages = createAsyncThunk('message/fetchMessages', async ({ token, userId }) => {
    const { data } = await api.post('/api/message/get', { to_user_id: userId }, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return data.success ? data : null
})

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        addMessages: (state, action) => {
            state.messages = [...state.messages, action.payload]
        },
        resetMessages: (state) => {
            state.messages = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                if (action.payload) {
                    state.messages = action.payload.messages
                }
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                console.error('❌ fetchMessages.rejected:', action.error)
            })
    }
})

export const { setMessages, addMessages, resetMessages } = messagesSlice.actions

export default messagesSlice.reducer