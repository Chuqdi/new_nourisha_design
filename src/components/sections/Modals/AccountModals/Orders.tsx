import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import moment from "moment";
import { Icon } from "@iconify/react";
import { ChevronLeft } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import SidebarHOC from "@/HOC/SidebarHOC";
import queryKeys from "@/config/queryKeys";
import { ILineUpItem, IOrder, IMeal, IDayMeals } from "@/config/types";
import useAuth from "@/hooks/useAuth";
import { DEVICE_ID } from "@/hooks/useFingerPrint";

// Types
type OrderCategory = "OPEN" | "CLOSED" | "MEALPLAN";
type OrderStatus = "processing" | "delivered" | "paid";

interface TabProps {
  label: string;
  value: OrderCategory;
  isActive: boolean;
  onClick: (value: OrderCategory) => void;
}

interface StatusBadgeProps {
  status: OrderStatus;
}

// Helper Components
const Tab = ({ label, value, isActive, onClick }: TabProps) => (
  <div
    onClick={() => onClick(value)}
    className={`flex-1 flex justify-center items-center text-center text-[#081E4B] cursor-pointer rounded ${
      isActive ? "bg-white" : "bg-transparent"
    }`}
  >
    {label}
  </div>
);

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig = {
    processing: {
      className: "bg-[#ffa6002d] text-primary-main",
      label: "Pending",
    },
    delivered: {
      className: "bg-[#1b881b] text-white",
      label: "Delivered",
    },
    paid: {
      className: "bg-[#ffa6002d] text-primary-main",
      label: "Paid",
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`text-xs font-semibold p-2 rounded-md ${config.className}`}>
      {config.label}
    </div>
  );
};

const EmptyState = () => (
  <div className="flex justify-center items-center mt-30">
    <img
      src="/images/no_order.png"
      alt="No orders"
      className="max-w-xs w-full opacity-70"
    />
  </div>
);

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((_, index) => (
      <div key={`skeleton_${index}`} className="flex items-center gap-4">
        <Skeleton className="w-14 h-14 rounded-lg" />
        <div className="flex-1">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="text-right">
          <Skeleton className="h-4 w-16 mb-2" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
    ))}
  </div>
);

// Meal Plan Components
const MealPlanList = ({
  lineup,
  onClick,
}: {
  lineup: ILineUpItem;
  onClick: (lineup: ILineUpItem) => void;
}) => {
  const isDelivered = useMemo(
    () => lineup?.delivery_status === "delivered",
    [lineup?.delivery_status]
  );

  return (
    <div
      className="cursor-pointer flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
      onClick={() => onClick(lineup)}
    >
      <div className="flex items-center gap-4">
        {lineup?.monday?.dinner?.mealId?.image_url ? (
          <img
            alt="Meal preview"
            src={lineup?.monday?.dinner?.mealId?.image_url}
            className="w-14 h-14 object-cover rounded-lg"
          />
        ) : (
          <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center">
            <Icon icon="mdi:food" className="w-6 h-6 text-gray-400" />
          </div>
        )}
        <div>
          <p className="font-medium text-sm">Meal Subscription</p>
          <p className="text-gray-500 text-xs">
            {moment(lineup?.createdAt).format("MMM, YYYY-MM-DD")}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-base mb-1">
          {lineup?.plan?.amount ? `£${lineup?.plan?.amount}` : "-"}
        </p>
        <StatusBadge status={isDelivered ? "delivered" : "paid"} />
      </div>
    </div>
  );
};

const SingleMealPlan = ({
  lineup,
  onBack,
}: {
  lineup: ILineUpItem;
  onBack: () => void;
}) => {
  const weekDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <div className="space-y-6">
      <button
        className="flex items-center gap-2 hover:text-gray-600 transition-colors"
        onClick={onBack}
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">Meal Plan Details</h3>
          <p className="text-sm text-gray-600">
            {moment(lineup?.createdAt).format("MMM, YYYY-MM-DD")}
          </p>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold mb-1">
            {lineup?.plan?.amount ? `£${lineup?.plan?.amount}` : "-"}
          </p>
          <StatusBadge
            status={
              lineup?.delivery_status === "delivered" ? "delivered" : "paid"
            }
          />
        </div>
      </div>

      {lineup?.monday?.dinner?.mealId?.image_url && (
        <img
          alt="Meal preview"
          src={lineup?.monday?.dinner?.mealId?.image_url}
          className="w-full h-48 object-cover rounded-lg"
        />
      )}

      <div className="space-y-4">
        <h4 className="font-semibold">Meal Schedule</h4>
        <div className="divide-y">
          {weekDays.map((day) => {
            const meals = lineup[day as keyof typeof lineup] as IDayMeals;
            if (!meals?.lunch && !meals?.dinner) return null;

            return (
              <div key={day} className="py-3">
                <p className="capitalize font-medium">{day}</p>
                <div className="ml-4 text-sm text-gray-600 space-y-1">
                  {meals?.lunch && (
                    <p>Lunch: {meals.lunch.mealId?.name || "Not specified"}</p>
                  )}
                  {meals?.dinner && (
                    <p>
                      Dinner: {meals.dinner.mealId?.name || "Not specified"}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function Orders() {
  const [activeCategory, setActiveCategory] =
    useState<OrderCategory>("MEALPLAN");
  const [selectedMealPlan, setSelectedMealPlan] = useState<ILineUpItem | null>(
    null
  );
  const { getAxiosClient } = useAuth();

  const { data, isLoading } = useQuery(
    [queryKeys.GET_ORDERS, activeCategory],
    () => {
      const deviceID = localStorage.getItem(DEVICE_ID);
      const axiosClient = getAxiosClient(deviceID!);

      const endpoints = {
        CLOSED: "orders/closed/orders",
        MEALPLAN: "orders/closed/orders/history",
        OPEN: "orders/open/orders",
      };

      return axiosClient.get(endpoints[activeCategory]);
    }
  );

  const orders = useMemo(() => {
    if (!data?.data?.data) return [];
    return activeCategory === "MEALPLAN"
      ? data.data.data._lineup
      : data.data.data;
  }, [data, activeCategory]);

  const renderContent = () => {
    if (isLoading) return <LoadingSkeleton />;
    if (!orders?.length) return <EmptyState />;

    return activeCategory === "MEALPLAN" ? (
      orders.map((lineup: ILineUpItem, index: number) => (
        <MealPlanList
          key={`meal_plan_${index}`}
          lineup={lineup}
          onClick={setSelectedMealPlan}
        />
      ))
    ) : (
      <div className="space-y-4">
        {orders.map((order: IOrder, index: number) => (
          <SingleListItem key={`order_${index}`} order={order} />
        ))}
      </div>
    );
  };

  return (
    <SidebarHOC isBack title="Orders">
      {selectedMealPlan ? (
        <SingleMealPlan
          lineup={selectedMealPlan}
          onBack={() => setSelectedMealPlan(null)}
        />
      ) : (
        <div className="space-y-6">
          <div className="bg-[#F5F5F5] h-10 flex p-1 justify-between rounded-lg">
            <Tab
              label="Meal Plan"
              value="MEALPLAN"
              isActive={activeCategory === "MEALPLAN"}
              onClick={setActiveCategory}
            />
            <Tab
              label="Open Orders"
              value="OPEN"
              isActive={activeCategory === "OPEN"}
              onClick={setActiveCategory}
            />
            <Tab
              label="Closed Orders"
              value="CLOSED"
              isActive={activeCategory === "CLOSED"}
              onClick={setActiveCategory}
            />
          </div>

          {renderContent()}
        </div>
      )}
    </SidebarHOC>
  );
}

// Keeping SingleListItem as is since it has its own complexity
function SingleListItem({ order }: { order: IOrder }) {
  const [showDetails, setShowDetails] = useState(false);
  const [meal, setMeal] = useState<IMeal | null>(null);
  const { getAxiosClient } = useAuth();

  const { data, isLoading } = useQuery(
    ["SINGLE_MEAL", order._id],
    () => {
      const deviceID = localStorage.getItem(DEVICE_ID);
      const axiosClient = getAxiosClient(deviceID!);
      return axiosClient.get(
        `meals/pack/${order?.orderExtras[order?.orderExtras?.length - 1]?.item}`
      );
    },
    {
      enabled: !!order?.orderExtras?.length,
      onSuccess: (data) => setMeal(data.data.data),
    }
  );

  const isProcessing = order?.status === "processing";
  const itemsCount = order?.orderExtras?.length || 0;

  if (isLoading || !meal?._id) {
    return (
      <div className="w-full flex justify-center items-center p-4">
        <Icon
          color="#000000ac"
          className="w-6 h-6 animate-spin"
          icon="eos-icons:loading"
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setShowDetails(true)}
      className="cursor-pointer flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
    >
      <div className="flex items-center gap-4">
        <img
          alt={meal.name}
          src={meal.image_url}
          className="w-14 h-14 object-cover rounded-lg"
        />
        <div>
          <p className="text-sm">
            {itemsCount} item{itemsCount !== 1 ? "s" : ""}
          </p>
          <p className="text-gray-500 text-xs">
            {moment(order.delivery_date).format("MMM, YYYY-MM-DD")}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-base mb-1">£{order.total}</p>
        <StatusBadge status={isProcessing ? "processing" : "paid"} />
      </div>
    </div>
  );
}
