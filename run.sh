#!/bin/bash

set -e  # 出错就退出

echo "▶️ Using mise Python version..."
mise use

# 判断 venv 文件夹是否存在
if [ ! -d ".venv" ]; then
  echo "🚀 Creating virtual environment..."
  python -m venv .venv
fi

echo "▶️ Activating virtual environment..."
source .venv/bin/activate

echo "📦 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "🏃 Running FastAPI server..."
uvicorn main:app --reload --host 0.0.0.0 --port 8000