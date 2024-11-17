from aiogram import Bot, Router, F
from aiogram.types import CallbackQuery, Message
from aiogram.filters import Command, CommandStart
import requests
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, KeyboardButtonPollType
from aiogram.utils.keyboard import ReplyKeyboardBuilder
import json

router = Router(name=__name__)

@router.message(CommandStart())
async def adminMenu(message: Message):
    body = {"tgId": message.from_user.id, "username": message.from_user.username}
    try:
        body['referalId'] = int(message.text[7:])

    except:
        pass

    print(body)
    response = requests.post('http://127.0.0.1:8000/api/users/create-user', json.dumps(body), headers={'content-type': 'application/json'})
    print(response.status_code, response.text)


    await message.answer("Приветствуем в проекте")


    
    

