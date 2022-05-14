# #14: React Query and Forms

> ***Disclaimer***: 이 글 내내 *[react-hook-form](https://react-hook-form.com/)을* 사용한다는 걸 유념해 주세요. 훌륭한 라이브러리라고 생각하기 때문입니다. 물론 추가한 패턴이 react-hook-form에서만 동작한다는 것을 의미하지는 않습니다. 개념은 모든 Form 라이브러리에 적용 가능하며 Form 라이브러리를 전혀 사용하지 않는 경우에도 마찬가지입니다.
>

---

Form은 데이터를 업데이트하는 주요 수단으로 많은 웹 응용 프로그램에서 중요하게 취급합니다. 우리는 data fetching([queries](https://tkdodo.eu/blog/react-query-as-a-state-manager))뿐만 아니라 수정([mutations](https://tkdodo.eu/blog/mastering-mutations-in-react-query))에도 React Query를 사용하고 있으므로, 사랑하는 비동기 상태 관리자를 Form과 어떻게든 통합해야 합니다.

좋은 소식은 물리적인 형태에 특별한 것이 없다는 것입니다. 여전히 데이터를 표시하기 위해 렌더링하는 html 요소들의 집합일 뿐이죠. 그러나 이러한 데이터를 변경하고자 할 때 서버와 클라이언트의 상태 사이의 경계가 약간 모호해지기 시작하므로 복잡성이 발생할 수 있습니다.

## **Server State vs. Client State**

요약하자면, 서버 상태는 대부분 비동기이며 우리가 소유하지 않은 상태이자, 마지막으로 데이터를 가져올 때의 모습의 스냅샷만 볼 수 있는 상태입니다.

클라이언트 상태는 프론트엔드가 완전히 제어할 수 있고 대부분 동기적이며 항상 정확한 값을 알고 있는 상태입니다.

사용자 목록을 표시하는 경우, 의심할 여지 없이 서버 상태입니다. 하지만 어떤 값을 업데이트하기 위해 사용자의 세부 정보를 Form에 표시하기 위해 클릭하면 어떻게 될까요? 서버 상태가 이제 클라이언트 상태가 될까요? 아니면 하이브리드인가요?

## **The simple approach**

저는 왜 [상태 관리자에서 다른 상태 관리자에게 상태를 복사](https://tkdodo.eu/blog/putting-props-to-use-state)하는 것을 좋아하지 않는지, 또는 [React Query에서 지역 상태로 상태](https://tkdodo.eu/blog/practical-react-query#keep-server-and-client-state-separate)를 복사하는지에 대해 이미 글을 작성했습니다.

하지만, 만약 여러분의 의도대로 수행되고 그 로직의 트레이드 오프를 알고 있다면, Form은 이 규칙의 예외가 될 수 있다고 생각합니다. 사용자 Form을 렌더링할 때 서버 상태를 초기 데이터로만 처리하려고 할 가능성이 높습니다. 우리는 first Name과 last Name을 가져와 Form 상태로 만든 다음 사용자가 업데이트하도록 하려 합니다.

예를 들어 보겠습니다.

```tsx
function PersonDetail({ id }) {
  const { data } = useQuery(['person', id], () => fetchPerson(id))
  const { register, handleSubmit } = useForm()
  const { mutate } = useMutation((values) => updatePerson(values))

  if (data) {
    return (
      <form onSubmit={handleSubmit(mutate)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('firstName')} defaultValue={data.firstName} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input {...register('lastName')} defaultValue={data.lastName} />
        </div>
        <input type="submit" />
      </form>
    )
  }

  return 'loading...'
}
```

이건 믿을 수 없을 정도로 잘 동작해요. 그러면 이 트레이드 오프는 무엇일까요?

## **Data might be undefined**

*useForm*은 전체 Form에 대해 직접 기본값을 사용할 수 있으므로 더 큰 Form들에 적합합니다. 그러나 조건부로 hook을 호출할 수 없으며 데이터가 첫 번째 렌더 사이클에 정의되지 않았기 때문에(먼저 데이터를 가져와야 함), 동일한 컴포넌트에서는 이 작업을 수행할 수 없습니다.

```tsx
const { data } = useQuery(['person', id], () => fetchPerson(id))
// 🚨 this will initialize our form with undefined
const { register, handleSubmit } = useForm({ defaultValues: data })
```

*useState*로 복사하거나 제어되지 않은 Form을 사용할 때도 같은 문제가 발생할 수 있습니다(참고로 react-hook-form은 후드 아래에 있습니다). 이에 대한 가장 좋은 해결책은 Form을 컴포넌트로 분할하는 것입니다.

```tsx
function PersonDetail({ id }) {
  const { data } = useQuery(['person', id], () => fetchPerson(id))
  const { mutate } = useMutation((values) => updatePerson(values))

  if (data) {
    return <PersonForm person={data} onSubmit={mutate} />
  }

  return 'loading...'
}

function PersonForm({ person, onSubmit }) {
  const { register, handleSubmit } = useForm({ defaultValues: person })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input {...register('firstName')} />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input {...register('lastName')} />
      </div>
      <input type="submit" />
    </form>
  )
}
```

data fetching과 프레젠테이션(presentation)이 분리되기 때문에 이는 그리 나쁘지 않습니다. 난 개인적으로 이런 분리에 대한 열정적인 팬은 아니지만, 여기서는 충분해요.

## **No background updates**

React Query는 UI를 서버 상태로 최신 상태로 유지하는 것입니다. 다른 위치에 해당 상태를 복사한다면 React Query는 더 이상 해당 작업을 수행할 수 없습니다. 어떤 이유로든 background refetch가 발생하여 새 데이터가 생성되어도 Form 상태가 업데이트 되지 않아요. 이 Form 상태(예: 프로필 페이지 양식)에 대해 작업하는 사람이 우리뿐이라면 문제가 없겠죠. 그 외라면 최소한의 *staleTime*을 설정하여 백그라운드 업데이트를 비활성화해야 합니다. 그렇다면, 업데이트 내용이 화면에 반영되지 않는다면 왜 계속 서버에 쿼리해야 할까요?

```tsx
// ✅ opt out of background updates
const { data } = useQuery(['person', id], () => fetchPerson(id), {
  staleTime: Infinity,
})
```

이러한 접근 방식은 대규모 Form과 협업 환경에서 문제가 될 수 있습니다. Form이 클수록 사용자가 작성하는 데 시간이 더 오래 걸리죠. 여러 사용자가 동일한 Form 내의 다른 필드에서 작업하는 경우, 다른 사용자가 마지막으로 업데이트한 내용을 다른 사용자가 덮어쓸 수 있습니다. 일부 오래된 버전이 화면에 계속 표시되기 때문이죠.

이제 react-hook-form을 사용하면 사용자가 변경한 필드를 탐지할 수 있으며 사용자 랜드 코드([여기를 참조해주세요](https://codesandbox.io/s/react-hook-form-submit-only-dirty-fields-ol5d2))가 있는 서버로 "dirty" 필드만 보낼 수 있습니다. 이건 꽤 멋져요. 그러나 다른 사용자가 업데이트한 최신 값은 여전히 표시되지 않아요. 그 사이에 특정 필드가 다른 사람에 의해 변경되었다는 것을 알았다면 입력이 변경될 수도 있죠.

그러면 Form을 편집하는 동안 백 운라업드 ㄷ이를트반 하영영면 어떻게 해야 할까요?

## **Keeping background updates on**

한 가지 접근법은 엄격하게 상태를 분리하는 것입니다. 서버 상태를 React Quert로 유지하고 사용자가 클라이언트 상태로 변경한 내용만 추적합니다. 그 때 우리가 사용자에게 보여주는 진실은 다음 두 가지로부터 파생되는 상태입니다. 사용자가 필드를 변경한 경우 클라이언트 상태가 표시됩니다. 그렇지 않으면 서버 상태로 돌아갑니다.

```tsx
function PersonDetail({ id }) {
  const { data } = useQuery(['person', id], () => fetchPerson(id))
  const { control, handleSubmit } = useForm()
  const { mutate } = useMutation((values) => updatePerson(values))

  if (data) {
    return (
      <form onSubmit={handleSubmit(mutate)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              // ✅ derive state from field value (client state)
              // and data (server state)
              <input {...field} value={field.value ?? data.firstName} />
            )}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <input {...field} value={field.value ?? data.lastName} />
            )}
          />
        </div>
        <input type="submit" />
      </form>
    )
  }

  return 'loading...'
}
```

이러한 접근 방식을 사용하면 백그라운드 업데이트를 계속 유지할 수 있습니다. 왜냐하면 이 업데이트는 여전히 작업하지 않은 필드에 관련되기 때문이에요. 우리는 더 이상 우리가 처음 Form을 만들었을 때 가졌던 초기 상태에 얽매이지 않게 돼요. 물론, 항상 그랬듯 여기에도 주의사항이 있습니다.

## **You need controlled fields**

제가 아는 한, 제어되지 않는(uncontrolled) 필드에서는 이를 해결할 좋은 방법이 없으므로 위의 예제에서 제어된(controlled) 필드를 사용하기로 했습니다. 제가 뭔가 빠뜨린 게 있으면 말씀해주세요.

## **Deriving state might be difficult**

이 방법은 null 병합을 사용하여 서버 상태로 쉽게 돌아갈 수 있지만 중첩된 객체와 제대로 병합(merge)하는 것이 더 어려울 수 있게 depth가 낮은 Form에 가장 적합합니다. 또한 백그라운드에서 Form 값만 변경하는 것이 사용자 환경에 문제가 될 수도 있죠. 서버 상태와 동기화되지 않은 값을 강조 표시하고 사용자가 수행할 작업을 결정할 수 있도록 하는 것이 더 나을 수 있습니다.

---

어떤 방법을 선택하든, 각 접근 방식이 가져오는 장점/단점을 인식하도록 노력해주세요.

## **Tips and Tricks**

Form을 설정하는 주요한 두 가지 방법 외에도, 소소하지만 React Query를 Form에 통합하는 몇 가지 중요한 요령이 있습니다.

### **Double submit prevention**

Form이 두 번 제출되지 않도록 하려면 *useMutation*에서 반환된 *isLoading* prop을 사용할 수 있습니다. mutation이 실행되는 동안에는 해당되며, Form 자체를 비활성화하기 위해 기본 submit 버튼을 비활성화 하면 됩니다.

```tsx
const { mutate, isLoading } = useMutation((values) => updatePerson(values))
<input type="submit" disabled={isLoading} />
```

### **Invalidate and reset after mutation**

Form submit 직후에 다른 페이지로 redirect하지 않는 경우, 유효성 검사가 완료된 Form은 초기화하는 것이 좋을 수 있습니다. [Mastering Mutations](https://tkdodo.eu/blog/mastering-mutations-in-react-query#some-callbacks-might-not-fire)에서 정의한 대로 여러분은 *mutate의 onSuccess* 콜백에서 이를 수행할 수 있습니다. 또한 서버 상태가 다시 선택되기 위해서는 *undefined*로 초기화하기만 하면 되므로 상태를 분리하여 유지하는 게 가장 좋습니다.

```tsx
function PersonDetail({ id }) {
    const queryClient = useQueryClient()
    const { data } = useQuery(['person', id], () => fetchPerson(id))
    const { control, handleSubmit, reset } = useForm()
    const { mutate } = useMutation(updatePerson, {
        // ✅ return Promise from invalidation
        // so that it will be awaited
        onSuccess: () => queryClient.invalidateQueries(['person', id]),
    })

    if (data) {
        return (
            <form
                onSubmit={handleSubmit((values) =>
                    // ✅ rest client state back to undefined
                    mutate(values, { onSuccess: () => reset() })
                )}
            >
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <input {...field} value={field.value ?? data.firstName} />
                        )}
                    />
                </div>
                <input type="submit" />
            </form>
        )
    }

    return 'loading...'
}
```
