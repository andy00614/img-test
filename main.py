# from fastapi import FastAPI

# app = FastAPI()

# @app.get("/")
# def read_root():
#     return {"message": "Hello from fastAPI!"}

# @app.get("/ping")
# def ping():
#     return {"ping": "pong!!"}

from fastapi import FastAPI, Request
import time
import functools

app = FastAPI()

# --- 自定义一个装饰器，用来记录请求时间 ---
def log(func):
    @functools.wraps(func)
    async def wrapper(*args, **kwargs):
        start = time.time()
        response = await func(*args, **kwargs)
        duration = time.time() - start
        print(f"⏱️ {func.__name__} took {duration:.4f} seconds")
        return response
    return wrapper

# --- 绑定多个路由到同一个处理器 ---
@app.get("/")
@app.get("/home")
@log  # 给这个接口加上日志打印
async def home():
    return {"message": "Welcome to Home!"}

# --- 一个带路径参数的 GET 接口 ---
@app.get("/hello/{name}")
@log
async def say_hello(name: str):
    return {"greeting": f"Hello, {name}!"}

# --- 一个 POST 接口，接收 JSON 数据 ---
@app.post("/sum")
@log
async def calculate_sum(payload: dict):
    numbers = payload.get("numbers", [])
    result = sum(numbers)
    return {"result": result}