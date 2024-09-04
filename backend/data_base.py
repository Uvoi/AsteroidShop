from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Float, DateTime, func, CheckConstraint, text, SmallInteger, Date, ARRAY, Numeric, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker, joinedload
from datetime import datetime


Base = declarative_base()

class Customer(Base):
    __tablename__ = 'customers'
    customerid = Column(Integer, primary_key=True)
    firstname = Column(String(50))
    lastname = Column(String(50))
    email = Column(String(100))
    address = Column(String(255), nullable=True)
    password = Column(String(), nullable=False)
    photo = Column(String(255), nullable=True)
    admin = Column(Boolean)
    baskets = relationship("Basket", back_populates="customer")

class Product(Base):
    __tablename__ = 'products'
    productid = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(String)
    price = Column(Integer, nullable=False)
    weight = Column(Float(precision=2))
    diameter = Column(Float(precision=1))
    category = Column(String(20))
    imglink = Column(String(255))

class Composition(Base):
    __tablename__ = 'composition'
    productid = Column(Integer, primary_key=True)
    iron = Column(SmallInteger)
    nickel = Column(SmallInteger)
    sulfur = Column(SmallInteger)
    magnesium = Column(SmallInteger)
    silicon = Column(SmallInteger)
    aluminum = Column(SmallInteger)
    calcium = Column(SmallInteger)
    oxygen = Column(SmallInteger)

class Comments(Base):
    __tablename__ = 'comments'
    commentsid = Column(Integer, primary_key=True)
    productid = Column(Integer)
    customerid = Column(Integer, ForeignKey('customers.customerid'))
    text = Column(String())
    date = Column(DateTime, default=func.current_timestamp())
    customer = relationship("Customer", backref="comments")

class Basket(Base):
    __tablename__ = 'basket'
    customerid = Column(Integer, ForeignKey('customers.customerid'), primary_key=True)
    productids = Column(ARRAY(Integer), nullable=False)
    customer = relationship("Customer", back_populates="baskets")

class Orders(Base):
    __tablename__ = 'orders'
    
    orderid = Column(Integer, primary_key=True, index=True)
    customerid = Column(Integer, index=True)
    productids = Column(ARRAY(Integer), nullable=False)
    totalprice = Column(Numeric(10, 2), nullable=False)
    orderdate = Column(Date, nullable=False)
    deliveryaddress = Column(String, nullable=False)
    deliverydate = Column(Date, nullable=False)
    status = Column(String, nullable=False)

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:0@localhost/asteroid_shop"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

Base.metadata.create_all(bind=engine)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def printCustomers():
    with SessionLocal() as session:
        customers = session.query(Customer).all()
        print("Список всех заказчиков:")
        for customer in customers:
            print(f"ID: {customer.customerid}, Имя: {customer.firstname}, Фамилия: {customer.lastname}, Эл. почта: {customer.email}")

def addProduct(session, name, description, price, weight, diameter, imglink, id=None):
    new_product = Product(
        name=name,
        description=description,
        price=price,
        weight=weight,
        diameter=diameter,
        imglink=imglink
    )
    if id:
        new_product.productid = id
    session.add(new_product)
    session.flush()  
    return new_product.productid

def addComposition(session, iron, nickel, sulfur, magnesium, silicon, aluminum, calcium, oxygen, productid):
    new_composition = Composition(
        productid=productid,
        iron=iron,
        nickel=nickel,
        sulfur=sulfur,
        magnesium=magnesium,
        silicon=silicon,
        aluminum=aluminum,
        calcium=calcium,
        oxygen=oxygen,
    )
    session.add(new_composition)

def addNewProduct(name, description, price, weight, diameter, imglink, composition, id=None):
    try:
        with SessionLocal() as session:
            with session.begin():
                product_id = addProduct(session, name, description, price, weight, diameter, imglink, id)
                addComposition(session, *composition.split(','), product_id)
                session.commit()
    except:
        print(f"Error:")
        session.rollback()
        raise

def addNewComment(prodID, userID, text):
    with SessionLocal() as session:
        with session.begin():
            new_comment = Comments(
                productid=prodID,
                customerid=userID,
                text=text
            )
            session.add(new_comment)
            session.commit()

def addNewCustomer(firstname, lastname, email, password):
    with SessionLocal() as session:
        with session.begin(): 
            new_customer = Customer(
                firstname=firstname,
                lastname=lastname,
                email=email,
                password=password
            )
            session.add(new_customer)
            session.commit()
            return True




SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()


def getAllProducts():
    allProducts = []
    with SessionLocal() as session:
        products = session.query(Product).all()
        for product in products:
            product_dict = {
                "id": product.productid,
                "title": product.name,
                "description": product.description,
                "price": product.price,
                "weight": product.weight,
                "diametgit": product.diameter,
                "category": product.category,
                "imgLink": product.imglink
            }
            allProducts.append(product_dict)
    return allProducts

def getProductByID(product_id):
    with SessionLocal() as session:
        product = session.query(Product).filter(Product.productid == product_id).first()
        if product:
            product_dict = {
                "id": product.productid,
                "title": product.name,
                "description": product.description,
                "price": product.price,
                "weight": product.weight,
                "diameter": product.diameter,
                "category": product.category,
                "imgLink": product.imglink
            }
            return product_dict
        else:
            return None


async def getCustomerByEmail(email):
    with SessionLocal() as session:
        customer = session.query(Customer).filter(Customer.email == email).first()
        if customer:
            customer_dict = {
                "id": customer.customerid,
                "firstname": customer.firstname,
                "lastname": customer.lastname,
                "email": customer.email,
                "address": customer.address,
                "password": customer.password,
            }
            customer_dict = {k: (v if v is not None else '') for k, v in customer_dict.items()}
            return customer_dict
        else:
            return None


def getCompositionByID(product_id):
    with SessionLocal() as session:
        composition = session.query(Composition).filter(Composition.productid == product_id).first()
        if composition:
            composition_dict = {
                "id" : composition.productid,
                "iron" : composition.iron,
                "nickel" : composition.nickel,
                "sulfur" : composition.sulfur,
                "magnesium" : composition.magnesium,
                "silicon" : composition.silicon,
                "aluminum" : composition.aluminum,
                "calcium" : composition.calcium,
                "oxygen" : composition.oxygen
            }
            return composition_dict
        else:
            return None


def format_datetime(date_str):
    dt = datetime.fromisoformat(date_str)
    formatted_date = dt.strftime('%d.%m.%Y %H:%M')
    return formatted_date


def getCommentsByProdID(product_id):
    allComments = []
    with SessionLocal() as session:
        comments = session.query(Comments).options(joinedload(Comments.customer)).filter(Comments.productid == product_id)
        
        for comment in comments:
            if comment.customer:
                customer_name = f"{comment.customer.firstname} {comment.customer.lastname}"
                customer_photo = comment.customer.photo
                comments_dict = {
                    "id": comment.commentsid,
                    "prodId": comment.productid,
                    "customerName": customer_name,
                    "customerPhoto": customer_photo,
                    "text": comment.text,
                    "date": format_datetime(str(comment.date))
                }
                allComments.append(comments_dict)
        return allComments


def add_products_to_basket(customer_id: int, product_ids: list[int]):
    with SessionLocal() as session:
        basket = session.query(Basket).filter(Basket.customerid == customer_id).first()
        
        if basket:
            updated_productids = basket.productids.copy()
            updated_productids.extend(product_ids)
            basket.productids = updated_productids
        else:
            basket = Basket(customerid=customer_id, productids=product_ids)
            session.add(basket)
        
        session.commit()



def get_products_from_basket(customer_id):
    with SessionLocal() as session:
        basket = session.query(Basket).filter(Basket.customerid == customer_id).first()
        if basket:
            return basket.productids
        else:
            return []

def delete_products_from_basket(customer_id: int, product_ids: list[int]):
    with SessionLocal() as session:
        basket = session.query(Basket).filter(Basket.customerid == customer_id).first()
        if basket:
            try:
                product_ids_to_remove = product_ids.copy()
                updated_productids = []
                
                for pid in basket.productids:
                    if pid in product_ids_to_remove:
                        product_ids_to_remove.remove(pid)
                    else:
                        updated_productids.append(pid)
                basket.productids = updated_productids
                session.commit()
            except Exception as e:
                session.rollback()
                print(f"Error deleting products from basket: {e}")
                raise
        else:
            raise ValueError("Basket not found for the given customer_id")


def delete_basket(customer_id: int):
    with SessionLocal() as session:
        basket = session.query(Basket).filter(Basket.customerid == customer_id).first()
        if basket:
            try:
                session.delete(basket)
                session.commit()
            except Exception as e:
                session.rollback()
                print(f"Error deleting basket: {e}")
                raise
        else:
            raise ValueError("Basket not found for the given customer_id")

def change_user_name(customer_id: int, new_name: dict):
    with SessionLocal() as session:
        customer = session.query(Customer).filter(Customer.customerid == customer_id).first()
        if customer:
            try:
                customer.firstname = new_name.firstName
                customer.lastname = new_name.lastName
                session.commit()
            except Exception as e:
                session.rollback()
                print(f"Error changing user name: {e}")
                raise
        else:
            raise ValueError("Customer not found for the given customer_id")

def change_user_address(customer_id: int, new_address: dict):
    with SessionLocal() as session:
        customer = session.query(Customer).filter(Customer.customerid == customer_id).first()
        if customer:
            try:
                customer.address = new_address.address
                session.commit()
            except Exception as e:
                session.rollback()
                print(f"Error changing user address: {e}")
                raise
        else:
            raise ValueError("Customer not found for the given customer_id")
        
def change_user_photo(customer_id: int, new_photo: dict):
    with SessionLocal() as session:
        customer = session.query(Customer).filter(Customer.customerid == customer_id).first()
        if customer:
            try:
                customer.photo = new_photo.photo
                session.commit()
            except Exception as e:
                session.rollback()
                print(f"Error changing user photo: {e}")
                raise
        else:
            raise ValueError("Customer not found for the given customer_id")



from sqlalchemy.orm import Session
from datetime import datetime

def get_user_orders(customer_id: int, admin: bool = False):
    with SessionLocal() as session:
        query = session.query(
            Orders.orderid,
            Orders.productids,
            Orders.totalprice,
            Orders.orderdate,
            Orders.deliveryaddress,
            Orders.deliverydate,
            Orders.status
        ).filter(Orders.customerid == customer_id)
        
        if not admin:
            query = query.filter(Orders.status.notin_(['Deleted', 'Error']))
        
        orders = query.all()

        orders_list = []
        for order in orders:
            orders_list.append({
                'orderid': order.orderid,
                'productids': order.productids,
                'totalprice': order.totalprice,
                'orderdate': datetime.fromisoformat(str(order.orderdate)).strftime('%d.%m.%Y'),
                'deliveryaddress': order.deliveryaddress,
                'deliverydate': datetime.fromisoformat(str(order.deliverydate)).strftime('%d.%m.%Y'),
                'status': order.status
            })

        return orders_list



def add_order(customerid: int, productids: list[int], deliveryaddress: str, orderdate: datetime, deliverydate: datetime, status: str):
    with SessionLocal() as db:
        new_order = Orders(
            customerid=customerid,
            productids=productids,
            totalprice=0,
            orderdate=orderdate,
            deliveryaddress=deliveryaddress,
            deliverydate=deliverydate,
            status=status
        )
        
        db.add(new_order)
        db.commit()
        db.refresh(new_order)
        
        return new_order
    
def get_user_photo(UserID):
    with SessionLocal() as session:
        customer = session.query(Customer).filter(Customer.customerid == UserID).first()
        if customer:
            return customer.photo
        else:
            return None

def set_status_order(orderID:int, status:str):
    with SessionLocal() as session:
        order = session.query(Orders).filter(Orders.orderid == orderID).first()
        if order:
            try:
                order.status = status
                session.commit()
            except Exception as e:
                session.rollback()
                print(f"Error {status} order: {e}")
                raise
        else:
            raise ValueError("Order not found for the given orderid")
        
def is_user_admin(customer_id: int):
    with SessionLocal() as session:
        user = session.query(Customer.admin).filter(Customer.customerid == customer_id).first()
        if user:
            return user.admin
        else:
            raise ValueError("Customer not found for the given customer_id")
        
def get_all_users(start: int, count: int):
    with SessionLocal() as session:
        users = session.query(Customer).offset(start).limit(count).all()
        total_count = session.query(Customer).count()
        
        users_data = []
        for user in users:
            user_data = {
                "customerid": user.customerid,
                "firstname": user.firstname,
                "lastname": user.lastname,
                "email": user.email,
                "photo": user.photo,
                "is_admin": user.admin,
            }
            users_data.append(user_data)
        
        return {"users": users_data, "total_count": total_count}

def get_all_orders(start: int, count: int):
    with SessionLocal() as session:
        orders = session.query(Orders).offset(start).limit(count).all()
        total_count = session.query(Orders).count()
        
        orders_data = []
        for order in orders:
            order_data = {
                'orderid': order.orderid,
                'customerid': order.customerid,
                'productids': order.productids,
                'totalprice': order.totalprice,
                'orderdate': datetime.fromisoformat(str(order.orderdate)).strftime('%d.%m.%Y'),
                'deliveryaddress': order.deliveryaddress,
                'deliverydate': datetime.fromisoformat(str(order.deliverydate)).strftime('%d.%m.%Y'),
                'status': order.status
            }
            orders_data.append(order_data)
        
        return {"orders": orders_data, "total_count": total_count}
    


def get_stats():
    with SessionLocal() as session:
        total_earnings = session.query(func.sum(Orders.totalprice)).filter(Orders.status != 'Error').scalar()
        products_in_transit = session.query(func.sum(func.array_length(Orders.productids, 1))) \
                                     .filter(Orders.status == 'In Transit') \
                                     .scalar()
        delivered_products = session.query(func.sum(func.array_length(Orders.productids, 1))) \
                                    .filter(Orders.status.in_(['Completed', 'Deleted'])) \
                                    .scalar()
        total_users = session.query(func.count(Customer.customerid)).scalar()

        total_orders = session.query(func.count(Orders.orderid)).scalar()
        return {
            "total_earnings": total_earnings or 0,
            "products_in_transit": products_in_transit or 0,
            "delivered_products": delivered_products or 0,
            "total_users": total_users or 0,
            "total_orders": total_orders or 0,
        }