from openpyxl import load_workbook
wb = load_workbook("sample.xlsx")
ws = wb.active

# insert

# ws.insert_rows(8) # 8번째 줄이 비워짐
# ws.insert_rows(8, 5) # 8번째 줄 위치에 5줄을 추가
# wb.save("sample_insert_rows.xlsx")

# ws.insert_cols(2) # b번째 열이 비워짐 (새로운 빈 열이 추가)
ws.insert_cols(2, 3) # b번째 열로부터 3열 추가
wb.save("sample_insert_rows,cols.xlsx")

# delete

# ws.delete_rows(8) # 8번째 줄에있는 7번학생 삭제
# ws.delete_rows(8, 3) # 8번째 줄부터 총 3줄 삭제

# ws.delete_cols(2) # 2번째 열에있는 (B) 영어점수 삭제
ws.delete_cols(2, 2) # 2번째 열로부터 총 2개 열 삭제


wb.save("sample_delete_rows,cols.xlsx")