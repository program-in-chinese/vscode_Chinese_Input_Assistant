# https://github.com/program-in-chinese/overview/blob/master/%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81/%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91.py
# 运行: $ python3 斐波那契.py

def 斐波那契(数):
    if 数 < 2:
        return 1
    else:
        return 斐波那契(数 - 2) + 斐波那契(数 - 1)

for 索引 in range(1,16):
    print(斐波那契(索引))
