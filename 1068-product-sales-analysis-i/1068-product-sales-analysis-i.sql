# Write your MySQL query statement below
select p.product_name , year,price from sales
inner join product p
on sales.product_id  = p.product_id