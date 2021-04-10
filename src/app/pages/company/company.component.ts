import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor() { }

  companies = [
    {
      name: "Tổng công ty giải pháp doanh nghiệp Viettel 123 123",
      description: "Đại diện cho Tập đoàn Công nghiệp Viễn thông Quân đội Viettel, mang đến cho khách hàng những giải pháp Công nghệ thông tin - Viễn thông toàn diện và tối ưu, trên nền hạ tầng công nghệ và dịch vụ hàng đầu của Tập đoàn Viettel"
  },
  {
    name: "Tổng công ty giải pháp doanh nghiệp Viettel",
    description: "tuấn anh tuấn anh tuấn anh tuấn anh tuấn anh hidden hidden hidden"
},
{
  name: "Tổng công ty giải pháp doanh nghiệp Viettel",
  description: "tuấn anh tuấn anh tuấn anh tuấn anh tuấn anh hidden hidden hidden"
},
{
  name: "Tổng công ty giải pháp doanh nghiệp Viettel",
  description: "tuấn anh tuấn anh tuấn anh tuấn anh tuấn anh hidden hidden hidden"
},
{
  name: "Tổng công ty giải pháp doanh nghiệp Viettel",
  description: "tuấn anh tuấn anh tuấn anh tuấn anh tuấn anh hidden hidden hidden"
}]
  ngOnInit(): void {
  }

}
