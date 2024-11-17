from fastapi import FastAPI, HTTPException
from aiogram import Bot, Dispatcher, types, F
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.types import Message
import asyncio
import start
from pydantic import BaseModel
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
import traceback

TELEGRAM_TOKEN = '7734073637:AAEY01wgogGBUCVRpaNjTVjihdFQJIxUJTQ'
bot = Bot(token=TELEGRAM_TOKEN)
storage = MemoryStorage()
dp = Dispatcher()

app = FastAPI()



class MessageRequest(BaseModel):
    channelId: str
    tgId: str

@app.on_event("startup")
async def startup():
    dp.include_router(start.router)
    asyncio.create_task(dp.start_polling(bot))

@app.post("/check-subscrition")
async def check_subscription(request: MessageRequest):
    try:
        user_channel_status = await bot.get_chat_member(chat_id=request.channelId, user_id = request.tgId)
        print(user_channel_status['status'])
        if user_channel_status['status'] != 'left':
            print('true')
            return {"status": "success", "check": True}

        else:
            print('false')
            return {"status": "success", "check": False}

        
    except Exception as e:
        traceback.print_exc()
        return {"status": "success", "check": False}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=81, reload=True)
